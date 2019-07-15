// Referenced from : https://ontio.github.io/documentation/ontology_wallet_dev_ts_sdk_en.html#how-to-generate-mnemonic
import { Crypto, Account } from 'ontology-ts-sdk';

export const BIP44_INDEX = 1024;

export function deriveOntology(mnemonic) {
  // const derivePath = `m/44'/${BIP44_INDEX}'/${index}'/0/0`
  // Use default path "m/44'/1024'/0'/0/0"
  const privateKey = Crypto.PrivateKey.generateFromMnemonic(mnemonic);

  // `password` is an empty string for simplicity.
  // Please refer the following link to see all params
  // https://apidoc.ont.io/tssdk/classes/_account_.account.html#create
  const account = Account.create(privateKey, '');

  return {
    address: account.address.toBase58(),
    publicKey: account.publicKey,
    privateKey: privateKey.key
  };
}