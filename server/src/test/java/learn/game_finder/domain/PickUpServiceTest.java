package learn.game_finder.domain;

import learn.game_finder.data.PickUpRepository;
import learn.game_finder.models.PickUp;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@SpringBootTest
public class PickUpServiceTest {

    //PickUp pickUp = new PickUp(0, "Test description", "2022-10-31", 2, 2, 2);

    @Autowired
    PickUpService service;

    @MockBean
    PickUpRepository repository;

    @Test
    void shouldFindById(){
        PickUp expected = makePickUp();
        expected.setPickUpId(1);
        when(repository.findById(1)).thenReturn(expected);
        PickUp actual = service.findById(1);
        assertEquals(expected,actual);
    }

    @Test
    void shouldFindByGameId(){
        PickUp pickUp = makePickUp();
        List<PickUp> expected = new ArrayList<>();
        expected.add(pickUp);
        when(repository.findByGameId(1)).thenReturn(expected);
        List<PickUp> actual = service.findByGameId(1);
        assertEquals(expected,actual);
    }

    @Test
    void shouldFindByLocationId(){
        PickUp pickUp = makePickUp();
        List<PickUp> expected = new ArrayList<>();
        expected.add(pickUp);
        when(repository.findByLocationId(2)).thenReturn(expected);
        List<PickUp> actual = service.findByLocationId(2);
        assertEquals(expected,actual);
    }

    @Test
    void shouldFindByUserId(){
        PickUp pickUp = makePickUp();
        List<PickUp> expected = new ArrayList<>();
        expected.add(pickUp);
        when(repository.findByUserId(2)).thenReturn(expected);
        List<PickUp> actual = service.findByUserId(2);
        assertEquals(expected,actual);
    }

    @Test
    void shouldAdd(){
        PickUp pickUpIn = makePickUp();
        PickUp pickUpOut = makePickUp();
        pickUpOut.setPickUpId(1);

        when(repository.add(pickUpIn)).thenReturn(pickUpOut);

        Result<PickUp> result = service.add(pickUpIn);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(pickUpOut, result.getPayload());
    }

    @Test
    void shouldNotAdd(){
//        //bad description
//        PickUp pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
//        pickUp.setPickUpInfo(" ");
//        Result<PickUp> actual = service.add(pickUp);
//        assertEquals(ResultType.INVALID, actual.getType());
//
//        //bad Id
//        pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
//        pickUp.setPickUpId(7);
//        actual = service.add(pickUp);
//        assertEquals(ResultType.INVALID, actual.getType());
//
//        //bad date
//        pickUp = new PickUp(0, "Test description", LocalDate.of(2022, 10, 31), 2, 2, 2);
//        pickUp.setPlayDate(LocalDate.of(2020, 10, 31));
//        actual = service.add(pickUp);
//        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate(){
        PickUp pickUp = makePickUp();
        pickUp.setPickUpId(1);

        when(repository.update(pickUp)).thenReturn(true);

        Result<PickUp> actual = service.update(pickUp);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateNullId(){
        PickUp pickUp = makePickUp();
        Result<PickUp> actual = service.update(pickUp);
        assertEquals(ResultType.INVALID, actual.getType());
        assertNull(actual.getPayload());
    }

    @Test
    void shouldDeleteById(){
        when(repository.deleteById(2)).thenReturn(true);
        assertTrue(service.deleteById(2));
    }

    @Test
    void shouldNotDeleteById() {
        when(repository.deleteById(10)).thenReturn(false);
        assertFalse(service.deleteById(10));
    }

    private PickUp makePickUp(){
        PickUp pickUp = new PickUp();
        pickUp.setPickUpInfo("Test Info");
        pickUp.setPlayDate(LocalDate.of(2022, 12, 30));
        pickUp.setLocationId(1);
        pickUp.setUserId(1);
        pickUp.setGameId(1);
        return pickUp;
    }
}
