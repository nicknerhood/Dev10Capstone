package learn.game_finder.models;

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

    public void setTitle(String name) {
        this.title = title;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String image_path) {
        this.imagePath = imagePath;
    }

    public String getGameInfo() {
        return gameInfo;
    }

    public void setGameInfo(String desc) {
        this.gameInfo = gameInfo;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
