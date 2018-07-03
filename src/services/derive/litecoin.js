const bip39 = require('bip39')
var bitcoin = require('bitcoinjs-lib')

export function deriveLitecoin (mnemonic) {
  const seed = bip39.mnemonicToSeed(mnemonic)
  let masterNode = bitcoin.HDNode.fromSeedBuffer(seed)
  let account0 = masterNode.derivePath("m/44'/2'/0'")

  const xpubstring = account0.neutered().toBase58();
  let xpub = xpubstring; 
  let key0 = account0.derivePath("0/0").keyPair
  let key0FromXpub = account0.neutered().derivePath("0/0").keyPair
  let xpriv = key0.toWIF()
    
  var network = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bip32: {
      public: account0.keyPair.network.bip32.public,
      private: account0.keyPair.network.bip32.private,
    },
    pubKeyHash: account0.keyPair.network.pubKeyHash,
    scriptHash: account0.keyPair.network.scriptHash,
    wif: account0.keyPair.network.wif
  };

  var addressFromPub = bitcoin.HDNode.fromBase58(xpub, network).derivePath("0/0").getAddress();
  return { address: addressFromPub, publicKey: xpub, privateKey: xpriv };
}