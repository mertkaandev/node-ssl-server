// Express, Node.js için minimal bir web çerçevesidir.
const express = require("express");

/** HTTPS modülü, Node.js içinde yer alan built-in bir modüldür. Yani Node.js indirildiğinde onunla beraber iner.
 * Bir HTTP protokolü olan HTTPS'i (hypertext transfer protocol secure) kullanmayı sağlar. HTTPS, HTTP protokolünün,
 * güvenli bir şifreleme eklentisi olarak çalışır. Verileri şifreli ve güvenli bir şekilde gönderip almayı sağlar. HTTPS,
 * güvenli veri gönderimi ve alımı için kritik önem taşır. Modül, SSL (secure socket layer) veya TLS (transport layer security)
 * protokollerini kullanarak verilerin şifrelenmesini sağlar.
 */
const https = require("https");

/* Path modülü Node.js içinde yer alan built-in bir modüldür. Nodejs ile beraber dosya ve dizin yolu ile ilgili işlemler yapmamızı sağlar. */
const path = require("path");

/* FS (file system) modülü  Node.js içinde dosya ve dizinlerle ilgili işlemler yapmanıza olanak tanıyan bir modüldür. 
Bu modül, Node.js uygulamalarının dosyaları okumalarına, yazmalarına, oluşturmalarına, silmelerine, değiştirmelerine 
ve diğer dosya sistemi işlemlerini yapmalarına yardımcı olur. Örneğin, fs modülü ile bir dosya okuyabilir, 
dosyaya yazabilir, dosyaların listesini alabilir, bir dizin oluşturabilir, bir dizin veya dosyayı silmek veya değiştirmek 
gibi işlemleri yapabilirsiniz. Ayrıca, fs modülü, dosya işlemleri için asenkron ve senkron olarak da seçenekler sunar, 
böylece uygulamanız için en uygun olanı seçebilirsiniz..
*/
const fs = require("fs");

// Express modülünü kullanarak server oluşturma işlemi.
const server = express();

server.get('/', async(req, res, next)=> {
    res.json({
       message: "Hello world. We are creating SSL server"
    });
});

// SSL Server
/* https.createServer() fonksiyonu ile ssl server oluşturulur. 
ilk parametre opsiyonlar, ikinci parametre ise uygulama sunucumuzdur */
const sslServer = https.createServer({
    // key: ssl sertifikası anahtarıdır.
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    // cert: sertifikanın kendisidir.
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem"))

}, server);

// Port
const PORT = 8006;

// HTTPS serveri çalıştır
sslServer.listen(PORT, ()=> {
    console.log("SSL Server is running on:"+PORT)
});