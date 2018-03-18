
/**
 * Download and store the image, genarate a 50x50 thumbnail of it and return the thumbnail URL.
 */


let thumbnail = (img)=>{

    return new Promise((resolve,reject)=>{

        let options = {
            url:img,
            dest:'./assets/thumbnails'
        };

        imagedownloader.image(options).then((file)=>{
            console.log(file);
            gm(file.filename).resize(50,50,'!').write(file.filename,(err)=>{
                if (!err){
                    resolve(file.filename);
                }
                else{
                    console.log(err);
                    reject(err);
                }
            });
        }).catch((err)=>{
            reject(err);
        })
    })

};

module.exports = {
    generate:thumbnail
};