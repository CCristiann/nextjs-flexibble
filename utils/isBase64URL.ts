export const isBase64URL = (value : string) => {
    const base64URLRegex = /^[A-Za-z0-9_-]{43}[AQgw]==$/;
      
    return base64URLRegex.test(value);
}