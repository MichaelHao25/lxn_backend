export default (list: string[][], orderId: string) => {
  const html = `<!DOCTYPE html> <html> <head> <meta http-equiv="content-type" content="text/html; charset=utf-8"> <title>${orderId}</title> </head> <body> <textarea style="display: none;">${JSON.stringify(
    list,
  )}</textarea> </body> </html>`;
  return html;
};
