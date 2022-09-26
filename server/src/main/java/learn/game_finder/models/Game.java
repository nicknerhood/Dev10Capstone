package learn.game_finder.models;

public class Game {

    private int gameId;
    private String name;
    private String imagePath;
    private String desc;
    private String genre;

    public Game() {
    }

    public Game(int gameId, String name, String imagePath, String desc, String genre) {
        this.gameId = gameId;
        this.name = name;
        this.imagePath = imagePath;
        this.desc = desc;
        this.genre = genre;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String image_path) {
        this.imagePath = imagePath;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
