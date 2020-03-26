import fs from 'fs';
import FCClient from '@alicloud/fc2';
import { fcName, serverName, account, fcOptions } from '../credentials';

var client = new FCClient(account, fcOptions);

export default function(zipPath) {
  return client.updateFunction(fcName, serverName, {
    code: {
      zipFile: fs.readFileSync(zipPath, 'base64')
    }
  });
}
