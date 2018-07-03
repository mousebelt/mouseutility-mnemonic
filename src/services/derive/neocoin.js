const bitcoinSecp256r1 = require("bitcoinjs-lib-secp256r1");
const bip39 = require("bip39");
const wif = require("wif");
const neonjs = require("neon-js");

export function deriveNeocoin (mnemonic) {
  const bip44path = `m/44'/888'/0'/0`;
  let passphrase = '';
  const actualSeed = bip39.mnemonicToSeed(mnemonic,passphrase);
  const rootNode = bitcoinSecp256r1.HDNode.fromSeedBuffer(actualSeed, bitcoinSecp256r1.bitcoin);
  const pathNode = rootNode.derivePath(bip44path);
  const pathNodeChild0 = pathNode.derive(0);
  const privateKey = pathNodeChild0.keyPair.toWIF();
  const addressObj = neonjs.getAccountFromWIFKey(privateKey);
  return { address: addressObj.address, publicKey: '', privateKey: privateKey };
}