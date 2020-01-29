// Type definitions for secp256k1 4.0
// Project: https://github.com/cryptocoinjs/secp256k1-node
// Definitions by:  Anler <https://github.com/anler>
//                  Dnewh <https://github.com/dnewh>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

/** Options for the `EcdsaSign` function */
export interface SignOptions {
    /**
     * Additional data for noncefn (RFC 6979 3.6) (32 bytes).
     *
     * By default is `null`.
     */
    data?: Uint8Array;

    /** Nonce generator. By default it is rfc6979 */
    noncefn?: (message: Uint8Array, privateKey: Uint8Array, algo: Uint8Array | null,
               data: Uint8Array | null, counter: number) => Uint8Array;
}
/** Options for the `ecdh` function */
export interface EcdhOptions {
    /**
     * Additional data for hashfn.
     *
     * By default is `null`.
     */
    data?: Uint8Array;
    xbuf?: Uint8Array;
    ybuf?: Uint8Array;

    /** Hashing function.  */
    hashfn?: (x: Uint8Array, y: Uint8Array, data: Uint8Array) => Uint8Array;
}

/**
 * Updates the context randomization to protect against side-channel leakage
 */
export function contextRandomize(seed: Uint8Array): void;

/**
 * Verify an ECDSA privateKey.
 */
export function privateKeyVerify(privateKey: Uint8Array): boolean;

/**
 * Negate a privateKey by subtracting it from the order of the curve's base point.
 */
export function privateKeyNegate(privateKey: Uint8Array): Uint8Array;

/**
 * Tweak a privateKey by adding tweak to it.
 */
export function privateKeyTweakAdd(privateKey: Uint8Array, tweak: Uint8Array): Uint8Array;

/**
 * Tweak a privateKey by multiplying it by a tweak.
 */
export function privateKeyTweakMul(privateKey: Uint8Array, tweak: Uint8Array): Uint8Array;

/**
 * Compute the public key for a privateKey.
 */
export function publicKeyCreate(privateKey: Uint8Array, compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Convert a publicKey to compressed or uncompressed form.
 */
export function publicKeyConvert(publicKey: Uint8Array, compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Negates a public key in place
 */
export function publicKeyNegate(publicKey: Uint8Array, compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Verify an ECDSA publicKey.
 */
export function publicKeyVerify(publicKey: Uint8Array): boolean;

/**
 * Tweak a publicKey by adding tweak times the generator to it.
 */
export function publicKeyTweakAdd(publicKey: Uint8Array, tweak: Uint8Array, compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Tweak a publicKey by multiplying it by a tweak value.
 */
export function publicKeyTweakMul(publicKey: Uint8Array, tweak: Uint8Array, compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Add a given publicKeys together.
 */
export function publicKeyCombine(publicKeys: Uint8Array[], compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Convert a signature to a normalized lower-S form.
 */
export function signatureNormalize(signature: Uint8Array): Uint8Array;

/**
 * Serialize an ECDSA signature in DER format.
 */
export function signatureExport(signature: Uint8Array): Uint8Array;

/**
 * Parse a DER ECDSA signature (follow by BIP66).
 */
export function signatureImport(signature: Uint8Array, output?: Uint8Array): Uint8Array;

/**
 * Create an ECDSA signature. Always return low-S signature.
 *
 * Inputs: 32-byte message `m`, 32-byte scalar key `d`, 32-byte scalar nonce `k`.
 * - Compute point `R = k * G`. Reject nonce if R's `x` coordinate is zero.
 * - Compute 32-byte scalar `r`, the serialization of R's `x` coordinate.
 * - Compose 32-byte scalar `s = k^-1 * (r * d + m)`. Reject nonce if `s` is zero.
 * - The signature is `(r, s)`.
 */
export function ecdsaSign(message: Uint8Array, privateKey: Uint8Array, options?: SignOptions): {signature: Uint8Array, recid: number};

/**
 * Verify an ECDSA signature.
 *
 * Note: return false for high signatures!
 *
 * Inputs: 32-byte message `m`, public key point `Q`, signature: (32-byte `r`, scalar `s`).
 * - Signature is invalid if `r` is zero.
 * - Signature is invalid if `s` is zero.
 * - Compute point `R = (s^-1 * m * G + s^-1 * r * Q)`. Reject if `R` is infinity.
 * - Signature is valid if R's `x` coordinate equals to `r`.
 */
export function ecdsaVerify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean;

/**
 * Recover an ECDSA public key from a signature.
 */
export function ecdsaRecover(signature: Uint8Array, recid: number, message: Uint8Array, compressed?: boolean, output?: Uint8Array): Uint8Array;

/**
 * Compute an EC Diffie-Hellman secret and applied sha256 to compressed public key.
 */
export function ecdh(publicKey: Uint8Array, privateKey: Uint8Array, options?: EcdhOptions, output?: Uint8Array): Uint8Array;
