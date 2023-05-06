export class ImageHelper
{
  static isValidBase64(str: string | null): boolean
  {
    if (str == null || str == '')
    {
      return false;
    }
    try
    {
      const index = str.indexOf(',')
      str = str.substring(index+1)
      const binaryStringLength = str.length;
      const bytes = new Uint8Array(binaryStringLength);
      for (let i = 0; i < binaryStringLength; i++)
      {
        bytes[i] = str.charCodeAt(i);
      }
      const blob = new Blob([bytes], {type: 'image/*'});
      const image = new Image();
      image.src = URL.createObjectURL(blob);
      return true;
    } catch (error)
    {
      return false;
    }
  }
}
