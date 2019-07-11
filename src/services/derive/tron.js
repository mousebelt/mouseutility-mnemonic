// Referenced from TronLink here: https://github.com/TronWatch/Desktop-Wallet/blob/master/app/actions/lib/AccountHandler.js
// Test validation of address: https://developers.tron.network/reference#walletvalidateaddress

import TronWeb from 'tronweb';
import bip39 from 'bip39';
import * as bip32 from 'bip32';
import { Buffer } from 'safe-buffer';

const BIP44_INDEX = 195;

export function deriveTron(mnemonic, index=0) {
  const seed = bip39.mnemonicToSeedHex(mnemonic);
  const node = bip32.fromSeed(new Buffer(seed, 'hex'));
  const child = node.derivePath(`m/44'/${BIP44_INDEX}'/${index}'/0/0`, seed);
  const privateKey = child.privateKey.toString('hex');
  const address = TronWeb.address.fromPrivateKey(privateKey);

  return { address, privateKey, publicKey: '' };
}