
#ifndef MBEDTLS_CONFIG_H
#define MBEDTLS_CONFIG_H

#if defined(_MSC_VER) && !defined(_CRT_SECURE_NO_DEPRECATE)
#define _CRT_SECURE_NO_DEPRECATE 1
#endif
#define MBEDTLS_ERROR_STRERROR_DUMMY
#define MBEDTLS_PK_WRITE_C
#define MBEDTLS_AESNI_C
#define MBEDTLS_HAVE_ASM
#define MBEDTLS_X509_RSASSA_PSS_SUPPORT
#define MBEDTLS_CIPHER_C
#define MBEDTLS_REMOVE_ARC4_CIPHERSUITES
#define MBEDTLS_X509_USE_C
#define MBEDTLS_PLATFORM_TIME_MACRO mbedtls_time
#define MBEDTLS_ECP_DP_SECP224K1_ENABLED
#define MBEDTLS_PLATFORM_PRINTF_MACRO mbedtls_printf
#define MBEDTLS_ECP_DP_BP384R1_ENABLED
#define MBEDTLS_GCM_C
#define MBEDTLS_SSL_TLS_C
#define MBEDTLS_KEY_EXCHANGE_ECDHE_PSK_ENABLED
#define MBEDTLS_CERTS_C
#define MBEDTLS_ECP_DP_BP256R1_ENABLED
#define MBEDTLS_SSL_DTLS_ANTI_REPLAY
#define MBEDTLS_KEY_EXCHANGE_ECDHE_ECDSA_ENABLED
#define MBEDTLS_SHA512_C
#define MBEDTLS_ECP_DP_SECP192K1_ENABLED
#define MBEDTLS_ECP_NIST_OPTIM
#define MBEDTLS_NO_PLATFORM_ENTROPY
#define MBEDTLS_ARIA_C
#define MBEDTLS_X509_CRT_WRITE_C
#define MBEDTLS_CIPHER_MODE_CBC
#define MBEDTLS_KEY_EXCHANGE_RSA_ENABLED
#define MBEDTLS_ECDSA_C
#define MBEDTLS_SSL_ALL_ALERT_MESSAGES
#define MBEDTLS_CMAC_C
#define MBEDTLS_PLATFORM_TIME_TYPE_MACRO long long
#define MBEDTLS_PK_RSA_ALT_SUPPORT
#define MBEDTLS_SSL_ENCRYPT_THEN_MAC
#define MBEDTLS_SSL_DTLS_BADMAC_LIMIT
#define MBEDTLS_SSL_COOKIE_C
#define MBEDTLS_SSL_EXTENDED_MASTER_SECRET
#define MBEDTLS_SSL_EXPORT_KEYS
#define MBEDTLS_CHACHA20_C
#define MBEDTLS_CIPHER_PADDING_ONE_AND_ZEROS
#define MBEDTLS_SHA1_C
#define MBEDTLS_ECP_DP_SECP521R1_ENABLED
#define MBEDTLS_KEY_EXCHANGE_DHE_PSK_ENABLED
#define MBEDTLS_DHM_C
#define MBEDTLS_X509_CSR_WRITE_C
#define MBEDTLS_ECDH_C
#define MBEDTLS_HAVE_TIME_DATE
#define MBEDTLS_HKDF_C
#define MBEDTLS_VERSION_C
#define MBEDTLS_PKCS1_V21
#define MBEDTLS_MD4_C
#define MBEDTLS_HMAC_DRBG_C
#define MBEDTLS_CIPHER_MODE_XTS
#define MBEDTLS_ECP_DP_SECP384R1_ENABLED
#define MBEDTLS_KEY_EXCHANGE_RSA_PSK_ENABLED
#define MBEDTLS_CAMELLIA_C
#define MBEDTLS_CIPHER_MODE_CFB
#define MBEDTLS_SSL_ALPN
#define MBEDTLS_ASN1_WRITE_C
#define MBEDTLS_ECP_DP_SECP224R1_ENABLED
#define MBEDTLS_THREADING_IMPL
#define MBEDTLS_ECP_DP_SECP256K1_ENABLED
#define MBEDTLS_BASE64_C
#define MBEDTLS_PK_PARSE_EC_EXTENDED
#define MBEDTLS_KEY_EXCHANGE_PSK_ENABLED
#define MBEDTLS_POLY1305_C
#define MBEDTLS_RIPEMD160_C
#define MBEDTLS_MD2_C
#define MBEDTLS_X509_CSR_PARSE_C
#define MBEDTLS_CUSTOM_HAS_PADLOCK
#define MBEDTLS_PK_PARSE_C
#define MBEDTLS_KEY_EXCHANGE_ECDHE_RSA_ENABLED
#define MBEDTLS_PKCS1_V15
#define MBEDTLS_ECJPAKE_C
#define MBEDTLS_AES_ENCRYPT_ALT
#define MBEDTLS_SSL_TRUNCATED_HMAC
#define MBEDTLS_PLATFORM_C
#define MBEDTLS_X509_CRT_PARSE_C
#define MBEDTLS_CIPHER_PADDING_ZEROS
#define MBEDTLS_SSL_RENEGOTIATION
#define MBEDTLS_VERSION_FEATURES
#define MBEDTLS_MD_C
#define MBEDTLS_SSL_KEEP_PEER_CERTIFICATE
#define MBEDTLS_PEM_WRITE_C
#define MBEDTLS_ECP_DP_CURVE448_ENABLED
#define MBEDTLS_HAVE_TIME
#define MBEDTLS_ASN1_PARSE_C
#define MBEDTLS_CCM_C
#define MBEDTLS_SHA256_C
#define MBEDTLS_SSL_SRV_C
#define MBEDTLS_SSL_TICKET_C
#define MBEDTLS_X509_CREATE_C
#define MBEDTLS_CUSTOM_HAS_AESNI
#define MBEDTLS_SSL_DTLS_HELLO_VERIFY
#define MBEDTLS_PEM_PARSE_C
#define MBEDTLS_BLOWFISH_C
#define MBEDTLS_KEY_EXCHANGE_ECDH_ECDSA_ENABLED
#define MBEDTLS_SSL_PROTO_TLS1_2
#define MBEDTLS_CHACHAPOLY_C
#define MBEDTLS_AES_C
#define MBEDTLS_CHECK_RETURN_WARNING
#define MBEDTLS_REMOVE_3DES_CIPHERSUITES
#define MBEDTLS_ERROR_C
#define MBEDTLS_SSL_SERVER_NAME_INDICATION
#define MBEDTLS_SSL_CONTEXT_SERIALIZATION
#define MBEDTLS_SSL_MAX_FRAGMENT_LENGTH
#define MBEDTLS_THREADING_C
#define MBEDTLS_ECP_DP_CURVE25519_ENABLED
#define MBEDTLS_ARC4_C
#define MBEDTLS_KEY_EXCHANGE_DHE_RSA_ENABLED
#define MBEDTLS_BIGNUM_C
#define MBEDTLS_ECP_DP_BP512R1_ENABLED
#define MBEDTLS_X509_TRUSTED_CERTIFICATE_CALLBACK
#define MBEDTLS_SSL_FALLBACK_SCSV
#define MBEDTLS_ECP_C
#define MBEDTLS_PKCS5_C
#define MBEDTLS_OID_C
#define MBEDTLS_PK_C
#define MBEDTLS_PADLOCK_C
#define MBEDTLS_CIPHER_PADDING_PKCS7
#define MBEDTLS_SSL_PROTO_DTLS
#define MBEDTLS_ECP_DP_SECP256R1_ENABLED
#define MBEDTLS_CTR_DRBG_C
#define MBEDTLS_X509_CHECK_KEY_USAGE
#define MBEDTLS_MD5_C
#define MBEDTLS_GENPRIME
#define MBEDTLS_SSL_DTLS_CLIENT_PORT_REUSE
#define MBEDTLS_RSA_C
#define MBEDTLS_CIPHER_PADDING_ZEROS_AND_LEN
#define MBEDTLS_DEBUG_C
#define MBEDTLS_ECP_DP_SECP192R1_ENABLED
#define MBEDTLS_X509_CRL_PARSE_C
#define MBEDTLS_SSL_CACHE_C
#define MBEDTLS_CIPHER_MODE_CTR
#define MBEDTLS_ECDH_LEGACY_CONTEXT
#define MBEDTLS_SSL_CLI_C
#define MBEDTLS_DES_C
#define MBEDTLS_TLS_DEFAULT_ALLOW_SHA1_IN_KEY_EXCHANGE
#define MBEDTLS_SSL_SESSION_TICKETS
#define MBEDTLS_XTEA_C
#define MBEDTLS_PKCS12_C
#define MBEDTLS_PLATFORM_GMTIME_R_ALT
#define MBEDTLS_SSL_RECORD_CHECKING
#define MBEDTLS_SELF_TEST
#define MBEDTLS_KEY_EXCHANGE_ECDH_RSA_ENABLED
#define MBEDTLS_X509_CHECK_EXTENDED_KEY_USAGE
#define MBEDTLS_CIPHER_MODE_OFB
#define MBEDTLS_NIST_KW_C
#define MBEDTLS_AES_DECRYPT_ALT
int mbedtls_printf(const char *format, ...);
typedef void* mbedtls_threading_mutex_t;
long long mbedtls_time(long long*);

#if defined(TARGET_LIKE_MBED)
#include "mbedtls/target_config.h"
#endif
#include <mbedtls/check_config.h>
#endif /* MBEDTLS_CONFIG_H */