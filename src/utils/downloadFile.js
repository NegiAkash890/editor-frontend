const downloadFile = (content, fileName, extension = 'txt') => {
  const element = document.createElement('a');
  const file = new Blob([content], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  const downloadAs = `${fileName}.${extension}`;
  element.download = downloadAs;
  document.body.appendChild(element);
  element.click();
};

export default downloadFile;
