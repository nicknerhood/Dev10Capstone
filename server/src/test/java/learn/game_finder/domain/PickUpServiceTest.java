package learn.game_finder.domain;

import learn.game_finder.data.PickUpRepository;
import learn.game_finder.models.PickUp;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class PickUpServiceTest {

    //PickUp pickUp = new PickUp(0, "Test description", "2022-10-31", 2, 2, 2);

    @Autowired
    PickUpService service;

    @MockBean
    PickUpRepository repository;

    @Test
    void shouldNotAdd(){
        PickUp pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
        pickUp.setPickUpInfo(" ");
        Result<PickUp> actual = service.add(pickUp);
        assertEquals(ResultType.INVALID, actual.getType());

        pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
        pickUp.setPickUpId(7);
        actual = service.add(pickUp);
        assertEquals(ResultType.INVALID, actual.getType());

        pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
        pickUp.setPlayDate(LocalDate.of(2020, 10, 31));
        actual = service.add(pickUp);
        assertEquals(ResultType.INVALID, actual.getType());

        pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
        pickUp.setGameId(9);
        actual = service.add(pickUp);
        assertEquals(ResultType.INVALID, actual.getType());

        pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
        pickUp.setUserId(9);
        actual = service.add(pickUp);
        assertEquals(ResultType.INVALID, actual.getType());
    }
}
