import StellarHDWallet from 'stellar-hd-wallet'

export function deriveStellar (mnemonic) {
    const wallet = StellarHDWallet.fromMnemonic(mnemonic)
    const publicKey = wallet.getPublicKey(0)
    const privateKey = wallet.getSecret(0)
    const keyPair = wallet.getKeypair(0)
    const account0 = wallet.derive(`m/44'/148'/0'`)
    console.log('wallet', wallet);
    console.log('keyPair',keyPair);
    console.log('account',account0);
    
    return {address: null, publicKey: publicKey, privateKey: privateKey};
}