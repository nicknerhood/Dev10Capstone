package learn.game_finder.models;

import java.util.List;

public class SignedUp {

    private int signedUpId;

    private int userId;

    private int pickupId;



    public int getSignedUpId() {
        return signedUpId;
    }

    public void setSignedUpId(int signedUpId) {
        this.signedUpId = signedUpId;
    }



    public int getPickupId() {
        return pickupId;
    }

    public void setPickupId(int  pickupId) {
        this.pickupId = pickupId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
