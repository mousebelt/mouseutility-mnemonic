// Referenced from : https://ontio.github.io/documentation/ontology_wallet_dev_ts_sdk_en.html#how-to-generate-mnemonic
import { Crypto, Account, utils } from 'ontology-ts-sdk';

export const BIP44_INDEX = 1024;

export function deriveOntology(mnemonic) {
  // const derivePath = `m/44'/${BIP44_INDEX}'/${index}'/0/0`
  // Use default path "m/44'/1024'/0'/0/0"
  const privateKey = Crypto.PrivateKey.generateFromMnemonic(mnemonic);
  const publicKey = privateKey.getPublicKey();
  const address = Crypto.Address.fromPubKey(publicKey);

  return {
    address: address.toBase58(),
    publicKey: publicKey.key,
    privateKey: privateKey.key
  };
}