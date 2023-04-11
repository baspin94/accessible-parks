import { UserContext } from '../App';
import { useContext } from 'react';

function ReviewCard({ review }) {

    const user = useContext(UserContext)

    if (user.id == review.user_id) {
        return <h3>Your review!</h3>
    } else {
        return <h3>Another user's review</h3>
    }
    

}

export default ReviewCard;