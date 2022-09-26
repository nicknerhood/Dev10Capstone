package learn.game_finder.models;

public class Game {

    private int gameId;
    private String name;
    private String image_path;
    private String desc;
    private String genre;

    public Game() {
    }

    public Game(int gameId, String name, String image_path, String desc, String genre) {
        this.gameId = gameId;
        this.name = name;
        this.image_path = image_path;
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

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
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
