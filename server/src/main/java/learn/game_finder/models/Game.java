package learn.game_finder.models;

import java.util.Objects;

public class Game {

    private int gameId;
    private String title;
    private String imagePath;
    private String gameInfo;
    private String genre;

    public Game() {
    }

    public Game(int gameId, String title, String imagePath, String gameInfo, String genre) {
        this.gameId = gameId;
        this.title = title;
        this.imagePath = imagePath;
        this.gameInfo = gameInfo;
        this.genre = genre;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getGameInfo() {
        return gameInfo;
    }

    public void setGameInfo(String gameInfo) {
        this.gameInfo = gameInfo;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Game game = (Game) o;
        return gameId == game.gameId && Objects.equals(title, game.title) && Objects.equals(imagePath, game.imagePath) && Objects.equals(gameInfo, game.gameInfo) && Objects.equals(genre, game.genre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameId, title, imagePath, gameInfo, genre);
    }

    @Override
    public String toString() {
        return "Game{" +
                "gameId=" + gameId +
                ", title='" + title + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", gameInfo='" + gameInfo + '\'' +
                ", genre='" + genre + '\'' +
                '}';
    }
}
