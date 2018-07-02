/* global describe, it */
const assert = require('assert')
const bip39 = require('bip39')
var bitcoin = require('bitcoinjs-lib')

export function deriveBitcoin (mnemonic) {
  const seed = bip39.mnemonicToSeed(mnemonic)
  let masterNode = bitcoin.HDNode.fromSeedBuffer(seed)
  let account0 = masterNode.derivePath("m/44'/0'/0'")

  const xpubstring = account0.neutered().toBase58();
  let xpub = xpubstring;  
  let key0 = account0.derivePath("0/0").keyPair
  let key0FromXpub = account0.neutered().derivePath("0/0").keyPair
  let xpriv = key0.toWIF()
  let addressFromPub = key0FromXpub.getAddress()
  return {address: addressFromPub, publicKey: xpub, privateKey: xpriv};
}