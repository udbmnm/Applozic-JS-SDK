import { exec } from 'child_process';
import path from 'path';
import { createRelease } from '../lib/git';

const release = async () => {
  // Check file hash
  const uiComponentsPath = path.join(__dirname, '../../packages/ui-components');
  exec(
    "tar --exclude='./node_modules' --exclude='./dist' -zcvf ./compressed.tgz .",
    {
      cwd: uiComponentsPath
    },
    (err, stdout, stderr) => {}
  );
  // await createRelease('storybook');
  // process.exit(0);
};

release();
