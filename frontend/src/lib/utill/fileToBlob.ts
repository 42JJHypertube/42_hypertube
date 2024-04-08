export default function fileToBlob(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.result) {
            const blob = new Blob([reader.result], { type: file.type });
            resolve(blob);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };