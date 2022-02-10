
function Question(id, body, answers, right_answer_index) {
    this.id = id
    this.body = body
    this.answers = answers
    this.right_answer_index = right_answer_index
    this.marked = false
    this.userChoice = ""
    this.answered = false
}

function Answers(op_1, op_2, op_3, op_4) {
    this.op_1 = op_1
    this.op_2 = op_2
    this.op_3 = op_3
    this.op_4 = op_4
}

Question.prototype.grade = function () {
    var grade = 0
    var choosed_answer = this.answers["op_" + this.userChoice]
    var right_answer = this.answers["op_" + this.right_answer_index]
    if (choosed_answer == right_answer) {
        grade = 10
    }
    return grade
}
Question.prototype.mark = function () {
    this.marked = true
}
Question.prototype.unmark = function () {
    this.marked = false
}


var english_exam_questions = {
    1: new Question(1, "Bolt from the blue", new Answers("Thundering", "A complete surprise", "Inform something bad", "No idea"), 2),
    2: new Question(2, "Blue blood", new Answers("Belonging to low class society", "Give complain in written", "Member of high class society", "Complain give verbally"), 3),
    3: new Question(3, "When the Principal entered the class, a student………. on the blackboard.", new Answers("Wrote", "was writing", "writes", "is writing"), 2),
    4: new Question(4, "She………TV when her husband came", new Answers("watch", "was watching", "is watching", "watched"), 2),
    5: new Question(5, "Select Correct Word", new Answers("Aceleration", "Aceeleration", "Accelaration", "Acceleration "), 4),
    6: new Question(6, "Select Correct Word", new Answers("Agressive", " Agrressive", "Aggressive", "Aggresive"), 3),
    7: new Question(7, " The boy was cured _____ typhoid.", new Answers("from", "of", "for", "through"), 2),
    8: new Question(8, "Voracious….", new Answers("tenacious", "truthful", "spacious", "ravenous"), 4),
    9: new Question(9, " Abortive….", new Answers("fruitful", "familiar", "unsuccessful", "consuming"), 3),
    10: new Question(10, " They listened to him ---", new Answers("spellbinded", "spellbind", "spellbinding", "spellbound"), 4),
    11: new Question(11, "Selfish people will not come forward —— others.", new Answers("help", "helping", "to help", "to helped"), 3)
}

var french_exam_questions = {
    1: new Question(1, "J'ai soif mais pas faim", new Answers("The villagers destroyed the forest", "The sofa has a modern look", "I'm thirsty but not hungry", "She is afraid to lose everything"), 3),
    2: new Question(2, "Est-ce que tu vois un café proche ?", new Answers("Do you accept credit cards?", "Do you see a cafe nearby?", "What do you think of these shoes?", "When did Jeff take the trash out?"), 2),
    3: new Question(3, "Les olympiens ont concouru pour la médaille d'or.", new Answers("The cowboy shot his gun.", "The olympians competed for the gold medal.", "The chair is missing a leg.", "She wasn;t wearing socks."), 2),
    4: new Question(4, "Je voudrais faire quelque chose d'utile.", new Answers("He is confident in his abilities.", "I travelled to the airport by train.", "I would like to do something meaningful.", "He eats lots of vegetables."), 3),
    5: new Question(5, "La linguistique est l'étude du langage.", new Answers("He doubled his wager.", "I'll have a glass of water ,please.", "Linguistics is the study of Language", "There is a secret room in the museum"), 3),
    6: new Question(6, "L'année scolaire se termine en juin.", new Answers("She is a fameous movie star.", "The school year ends in June.", "A single vote decided the election.", "These sheets are soft."), 2),
    7: new Question(7, "Quelle est ta couleur favorite ?", new Answers("Does your apartment have a WIFI?", "What's your favourtite color?", "Is your name on the guest list?", "How're they doing now?"), 2),
    8: new Question(8, "J'aimerais faire une réservation.", new Answers("The press covered the war in detail", "The cowbly shot his gun.", "I'd like to make a reservation.", "We live in a residental neighbourhood."), 3),
    9: new Question(9, "Je pense que tu as trop de vêtements.", new Answers("The village is in a remote location.", "I think you have too many clothes.", "They like post-rock music.", "The museum is free every Friday."), 2),
    10: new Question(10, "Que font généralement les gens ici ?", new Answers("How're they doing now?", "What do people usually do here?", "What's your brother's job?", "Do you accept credit cards?"), 2),
    11: new Question(11, "Où est-ce que je peux charger ma tablette ?", new Answers("Where can I charge my tablet?", "Does he think that I am stupid?", "Can you help me light the match?", "How many languages do you speak?"), 1)
}

var exams = {
    eng: english_exam_questions,
    fr: french_exam_questions
}