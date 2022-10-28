puts 'Seeding data...'

u1 = User.create(username: "testuser", password: 'test')

f1 = Flashcard.create(question: "Question example string 1", answer: "Answer example string 1")
f2 = Flashcard.create(question: "Question example string 2", answer: "Answer example string 2")
f3 = Flashcard.create(question: "Question example string 3", answer: "Answer example string 3")
f4 = Flashcard.create(question: "Question example string 4", answer: "Answer example string 4")
f5 = Flashcard.create(question: "Question example string 5", answer: "Answer example string 5")
f6 = Flashcard.create(question: "Question example string 6", answer: "Answer example string 6")
f7 = Flashcard.create(question: "Question example string 7", answer: "Answer example string 7")

c1 = Collection.create(name: "Test Collection 1", subject: "TST101", short_description: "Testing...", user: u1)

CollectionFlashcard.create(collection: c1, flashcard: f1)
CollectionFlashcard.create(collection: c1, flashcard: f2)
CollectionFlashcard.create(collection: c1, flashcard: f3)
CollectionFlashcard.create(collection: c1, flashcard: f4)
CollectionFlashcard.create(collection: c1, flashcard: f5)

puts 'Done seeding!'