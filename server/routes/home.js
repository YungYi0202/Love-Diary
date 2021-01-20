import Event from '../models/Event'

exports.GetFavEvents = async(req, res) => {
    Event.find({
        accountId: req.query.accountId,
        favorite: true
        }, (err, Events) => {
        if (err) {
          console.error(err);
          res.status(403).json({message: 'error', events: []});
        }
        else{
            res.status(200).json({message: 'success', events: Events});
        }
    });
}