package learn.game_finder.models;

import java.time.LocalDate;

public class PickUp {

    private int pickUpId;
    private String pickUpInfo;
    private LocalDate playDate;
    private int locationId;
    private int gameId;
    private int userId;

    public PickUp(int pickUpId, String pickUpInfo, LocalDate playDate, int locationId, int gameId, int userId) {
        this.pickUpId = pickUpId;
        this.pickUpInfo = pickUpInfo;
        this.playDate = playDate;
        this.locationId = locationId;
        this.gameId = gameId;
        this.userId = userId;
    }

    public PickUp() {
    }

    public int getPickUpId() {
        return pickUpId;
    }

    public void setPickUpId(int pickUpId) {
        this.pickUpId = pickUpId;
    }

    public String getPickUpInfo() {
        return pickUpInfo;
    }

    public void setPickUpInfo(String pickUpInfo) {
        this.pickUpInfo = pickUpInfo;
    }

    public LocalDate getPlayDate() {
        return playDate;
    }

    public void setPlayDate(LocalDate playDate) {
        this.playDate = playDate;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
