import { exec } from 'child_process';
import path from 'path';
import md5File from 'md5-file';
import { addLocalGitTag, pushGitTags, checkIfTagExists } from '../lib/git';

const release = async () => {
  // Check file hash
  const uiComponentsPath = path.join(__dirname, '../../../ui-components');
  exec(
    // TODO: Improve exclude pattern
    // Ideally the tar should ignore all ignored in .gitignore
    `tar --exclude='./node_modules' --exclude='./dist' --exclude='./.DS_Store' -cvf - . | shasum`,
    {
      cwd: uiComponentsPath
    },
    async (err, stdout, stderr) => {
      // console.log({ err, stdout, stderr });
      if (err) {
        console.error(err);
        return;
      }

      stdout = stdout.replace('-\n', '').trim();

      console.log({ stdout });

      // const filepath = path.join(uiComponentsPath, fileName);
      const hash = stdout;
      // console.log(`File hash: ${hash}`);
      const releaseName = `release-storybook-${hash}`;
      if (await checkIfTagExists(releaseName)) {
        console.log('Storybook with current changes already released');
        return;
      }

      const annotation = `storybook release: ${hash}`;
      await addLocalGitTag(releaseName, annotation);
      await pushGitTags();
      process.exit(0);
    }
  );
  // process.exit(0);
};

release();
