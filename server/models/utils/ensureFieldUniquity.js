export default fieldName => async function(next, done){
    const uniqueField = this[fieldName];
    await this.constructor.findOne({ [fieldName]: uniqueField }, (err, documentThatTookTheValue) => {
        if(err) done(err);
        if(documentThatTookTheValue) done('Name already taken');
        done();
    });
}