var messages = [];
var id = 0;

/*
var sampleMessage = {
    id: 0,
    text: "",
    time: ""
}

*/

module.exports = {
    create: (req, res) => {
        const { text, time, user } = req.body;
        messages.push({ id, text, time, user });
        id++;
        res.status(200).send(messages);
    },
    read: (req, res) => {
        res.status(200).send(messages);
    },
    update:(req, res) => {
        let newID = Number(req.params.id);
        const { text } = req.body;

        index = messages.findIndex((el) => el.id === newID);
        if (index !== -1) {
            messages[index].text = text;
        }

        res.status(200).send(messages);

    },
    delete:(req, res) => {
        let newID = Number(req.params.id);

        index = messages.findIndex((el) => el.id === newID);
        if (index !== -1) {
            messages.splice(index, 1) 
        }

        res.status(200).send(messages);
    }
}