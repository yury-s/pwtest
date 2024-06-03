import https from 'https';
import url from 'url';

async function main() {
  const parsed = url.parse('https://lppool.catalogsites.net/lf?source=url[file:/MasterSite/CD61/Email/_template_2021/bedding_snob_logo.png]&sink=format[png],quality[96]');
  const options = {
    hostname: parsed.hostname,
    path: parsed.path,
    headers: {
      // Removing the User-Agent will cause the request to end up in 403.
      // With the User-Agent only "request finished" is logged.
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    }
  };

  const req = https.request(options, res => {
    console.log('res.statusCode', res.statusCode);
  });
  console.log('sending request');
  req.on('error', e => console.error(e));
  req.on('close', () => console.log('request closed'));
  req.on('finish', () => console.log('request finished'));

  req.end();
}

main();