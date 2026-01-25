import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';

const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ''
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

const certificateName = 'openelection.booth.web';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

export function ensureCertificatesExist() {
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true });
    }

    try {
      // Try to get the certificate from dotnet
      const result = childProcess.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
      ]);

      if (result.error) {
        console.log(result.error);
        return;
      }

      if (!fs.existsSync(keyFilePath)) {
        // If key file not created, try an alternative approach
        childProcess.spawnSync('dotnet', [
          'dev-certs',
          'https',
          '--trust',
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function readCertificate() {
  ensureCertificatesExist();

  const certExists = fs.existsSync(certFilePath);
  const keyExists = fs.existsSync(keyFilePath);

  if (certExists && keyExists) {
    return {
      key: fs.readFileSync(keyFilePath, 'utf8'),
      cert: fs.readFileSync(certFilePath, 'utf8'),
    };
  }

  return undefined;
}

