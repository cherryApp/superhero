//////////////////////////////////////////////////////

// Sémák beállítása.
var testSchema = mongoose.Schema;
var personSchema = testSchema({
    name: String,
    age: Number,
    stories: [{
        type: testSchema.Types.ObjectId,
        ref: 'Story'
    }]
});
var storySchema = testSchema({
    _creator: {
        type: testSchema.Types.ObjectId,
        ref: 'Person'
    },
    title: String,
    fans: [{
        type: Number,
        ref: 'Person'
    }]
});

// Modellek definiálása a sémák alapján.
var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

// Új Person példány létrehozása.
var aaron = new Person({
    name: 'Aaron',
    age: 100
});

// Person példány mentése, majd egy stori hozzákapcsolása.
aaron.save(function (err) {
    if (err) {
        console.log(err);
        return;
    }

    var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id // assign the _id from the person
    });

    story1.save(function (err) {
        if (err) return handleError(err);
        console.log("aaron saved");
    });
});

// Story lekérése kiterjesztve a porson-al.
Story
    .findOne({
        title: 'Once upon a timex.'
    })
    .populate('_creator')
    .exec(function (err, story) {
        if (err) console.error(err);
        console.log('The creator is %s', story._creator.name);
        // prints "The creator is Aaron"
    });
