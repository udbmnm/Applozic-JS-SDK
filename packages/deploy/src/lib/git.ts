import fs from 'fs';
import path from 'path';
import simpleGit, { SimpleGitOptions } from 'simple-git';
import readline from 'readline';

enum PACKAGES {
  CORE = 'core',
  UI_COMPONENTS = 'ui-components',
  LOCAL_STORE = 'local-store'
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const options: Partial<SimpleGitOptions> = {
  baseDir: path.join(__dirname, '../../../../'),
  binary: 'git',
  maxConcurrentProcesses: 6
};
const git = simpleGit(options);

const getPathToPackageJson = (packageName: string) =>
  path.join(__dirname, `../../../${packageName}/package.json`);

const updateVersionInPackageJson = async (
  packageName: string,
  version: string
) =>
  new Promise<void>((resolve, reject) => {
    const packageJsonPath = getPathToPackageJson(packageName);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    git.add(packageJsonPath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        git.commit(`Updated ${packageName} version to ${version}`, err => {
          if (err) {
            reject(err);
          } else {
            // console.log('Commited package.json');
            git.push(err => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          }
        });
      }
    });
  });

export const getCurrentPackageVersion = (packageName: string): string => {
  const pathToPackageJSON = getPathToPackageJson(packageName);
  const packageContents = fs.readFileSync(pathToPackageJSON, 'utf8');
  const packageJSON = JSON.parse(packageContents);
  return packageJSON.version;
};

export const checkIfTagExists = async (tagName: string) =>
  new Promise((resolve, reject) => {
    git.tags((err, tags) => {
      if (err) {
        reject(err);
      } else {
        const allTags = tags.all;
        resolve(allTags.filter(tag => tag === tagName).length > 0);
      }
    });
  });

export const pushGitTags = (): Promise<void> =>
  new Promise((resolve, reject) => {
    git.pushTags((result, err) => {
      if (err) {
        console.error('Tag push error', { err });
        reject(err);
      } else {
        // console.log('Pushed tags');
        resolve();
      }
    });
  });

export const addLocalGitTag = (tagName: string, annotation: string) =>
  new Promise(resolve => {
    git.addAnnotatedTag(tagName, annotation, (err, data) => {
      if (err) {
        throw err;
      } else {
        resolve(data);
      }
    });
  });

export const createRelease = async (packageName: string) => {
  const version = getCurrentPackageVersion(packageName);
  const tagName = `release-${packageName}-v${version}`;
  try {
    if (!(await checkIfTagExists(tagName))) {
      const annotation = `${packageName} Release v${version}`;
      await addLocalGitTag(tagName, annotation);
      await pushGitTags();
    } else {
      console.log(`Git tag "${tagName}" already exists`);
      rl.question(
        'You want to increment minor version and release? y/N',
        async answer => {
          if (answer.toLocaleLowerCase() === 'y') {
            const newVersion = `${version.split('.')[0]}.${
              parseInt(version.split('.')[1], 10) + 1
            }.0`;
            await updateVersionInPackageJson(packageName, newVersion);

            return createRelease(packageName);
          } else {
            console.log('Stopping release.');
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
