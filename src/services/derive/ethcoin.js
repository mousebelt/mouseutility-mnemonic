const { EthHdWallet } = require('eth-hd-wallet')

export function deriveEthereum (mnemonic) {
    const wallet = EthHdWallet.fromMnemonic(mnemonic)
    const key = wallet._deriveNewKeys(1);
    const address = key[0].address;
    const privateKey = key[0].wallet.getPrivateKeyString();
    const publicKey = '';//key[0].wallet.getPublicKeyString();
    
    return { address: address, publicKey: publicKey, privateKey: privateKey};
}