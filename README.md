# node-ssl-server

Node.js sunucusunu HTTPS altında çalıştırabilmek için bir SSL Sertifikası oluşturmalısınız. Fakat Google, güvenli sertifika oluşturuculara güvendiğinden dolayı Node.js sunucunuzu HTTPS protokolünde çalıştırıyor olsanız bile oluşturacağınız SSL Sertifikası bir güvenli sertifika oluşturucu tarafından sağlanmadığı için sunucunuzu çalıştırdığınızda "sertifika güvenli değil" hatası alabilirsiniz. Bu sebeple, oluşturacağınız sertifikayı sadece geliştirme ortamında (localhost) kullanmalısınız. 

`localhost` ortamında kullanmak için bir SSL Sertifikası oluşturmak için sırasıyla aşağıdaki adımları takip edin:

## 1. Anahtar oluşturun:

Klasörün anadizinde iseniz terminalden `cd cert` komutunu girerek `cert` klasörü içine girin. SSL için oluşturulacak tüm dosyalar bu klasör altında olacağından bu adım önemlidir. Ardından aşağıdaki komut satırını terminalden girin, bu komut satırı `cert` anadizini altında `key.pem` isimli bir anahtar dosyası oluşturacaktır.

`openssl genrsa -out key.pem`

![image](https://user-images.githubusercontent.com/101933251/222890001-b1d39c8b-1d05-4564-807e-339549248996.png)

![image](https://user-images.githubusercontent.com/101933251/222891230-1b5c13d2-d7a6-41c8-9b4a-eaa36698b3f0.png)

**Komut Açıklaması**: `openssl genrsa` komutu, OpenSSL kütüphanesi tarafından desteklenen RSA (Rivest-Shamir-Adleman) şifreleme algoritması için anahtar dosyası oluşturmak için kullanılan bir komandır. RSA, açık anahtar ve kapalı anahtar şifreleme algoritmasıdır ve kriptografik işlemler için yaygın olarak kullanılır. Bu komut, RSA anahtarının boyutunu (bit sayısı) belirtebileceğiniz bir dosyada kaydetmenize olanak tanır. Bu RSA anahtarı, SSL/TLS (Secure Socket Layer/Transport Layer Security) sertifikalarının oluşturulması, şifrelenmiş mesajların imzalanması veya şifrelenmesi gibi işlemler için kullanılabilir.

## 2. CSR (certificate signing request - sertifika imzalama talebi) oluşturun:

CSR (Certificate Signing Request) sertifika sağlayıcısına sertifika için gerekli bilgilerin gönderilmesi için kullanılan bir dosyadır. CSR oluşturmak için de `openssl` komutu kullanılır. Aşağıdaki komut satırını terminalden girin, bu komut satırı `csr.pem` adında bir CSR dosyası oluşturmak için sizden bazı bilgiler ister. Örneğin `Country Name:` bilgisi isteyebilir, `en` ya `tr` gibi değer verebilirsiniz. Geçici bilgiler girildikten sonra en son aşamada bir `challenge password` ister, bu kısım önemlidir çünkü eşleşme şifresidir. İstediğiniz bir şifre değeri verebilirsiniz. Aşağıdaki resimde bir örnek görebilirsiniz: 

`openssl req -new -key key.pem -out csr.pem`

![image](https://user-images.githubusercontent.com/101933251/222890338-e93a0a2d-f990-4ad5-9d88-220311c94815.png)

![image](https://user-images.githubusercontent.com/101933251/222890811-faea2336-c9ef-49ff-892d-6e5ece6773a8.png)

**Komut Açıklaması:** Bu komut, OpenSSL kütüphanesi tarafından desteklenen bir SSL/TLS sertifikası için bir CSR (Certificate Signing Request) oluşturmak için kullanılan bir komandır. Bu komut, belirtilen anahtar dosyası ve seçenekler kullanılarak bir SSL/TLS sertifikası için bir CSR oluşturacaktır. Sonuç olarak, "csr.pem" adında bir CSR dosyası oluşacaktır. Komutun parçaları şunlardır:

 + openssl req: OpenSSL kütüphanesinin CSR oluşturmak için kullanılan araçlarını çağırır.
 + new: Bu seçenek, yeni bir CSR oluşturmak için kullanılır.
 + key key.pem: Bu seçenek, CSR oluşturulurken kullanılacak olan anahtar dosyasının adını belirtir.
 + out csr.pem: Bu seçenek, oluşturulan CSR dosyasının adını belirtir.

## 3. SSL Sertifikası oluşturun: 

Aşağıdaki komutu terminalden girin. Sonucunda `cert` dizini altında `cert.pem` dosyası oluşturacaktır:

`openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`

![image](https://user-images.githubusercontent.com/101933251/222890975-56c54279-0cff-4724-a0d3-00e4f92c6b41.png)

**Komut Açıklaması**: Bu komut, OpenSSL kütüphanesi tarafından desteklenen X.509 v3 SSL/TLS sertifikaları oluşturmak için kullanılan bir komandır. Bu komut, belirtilen CSR dosyası, anahtar dosyası ve seçenekler kullanılarak X.509 v3 SSL/TLS sertifikası oluşturacaktır. Sonuç olarak, "cert.pem" adında bir sertifika dosyası oluşacaktır. Komutun parçaları şunlardır:
   
   + openssl x509: OpenSSL kütüphanesinin X.509 sertifikaları oluşturmak için kullanılan araçlarını çağırır.
   + req: Bu seçenek, sertifika için gerekli olan bir CSR (Certificate Signing Request) dosyasının varlığını gösterir.
   + days 365: Bu seçenek, sertifikanın geçerli kalma süresini belirler. Örnekte, sertifika 365 gün boyunca geçerli kalacaktır.
   + in csr.pem: Bu seçenek, sertifika için gerekli olan CSR dosyasının adını belirtir.
   + signkey key.pem: Bu seçenek, sertifikanın imzalanması için kullanılacak olan anahtar dosyasının adını belirtir.
   + out cert.pem: Bu seçenek, oluşturulan sertifika dosyasının adını belirtir.

## 4. Oluşturulan Sertifikayı Kullanmak

Oluşturulan SSL Sertifikasını Node.js Sunucusunda kullanabilirsiniz. Repository'deki `index.js` dosyasını kontrol edin. İçindeki kodlar ve açıklama satırları, oluşturulan sertifikayı kullanan bir HTTPS sunucusunu ayağa kaldırmayı açıklıyor:

![image](https://user-images.githubusercontent.com/101933251/222891861-0b587576-253f-494d-b164-afa3e2eceb30.png)
