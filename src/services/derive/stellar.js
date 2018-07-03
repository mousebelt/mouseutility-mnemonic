import StellarHDWallet from 'stellar-hd-wallet'

export function deriveStellar (mnemonic) {
    const wallet = StellarHDWallet.fromMnemonic(mnemonic)
    const account0 = wallet.derive(`m/44'/148'/0'`)
    const publicKey = wallet.getPublicKey(0)
    const privateKey = wallet.getSecret(0)
    const keyPair = wallet.getKeypair(0)
    return { address: publicKey, publicKey: '', privateKey: privateKey} ;
}