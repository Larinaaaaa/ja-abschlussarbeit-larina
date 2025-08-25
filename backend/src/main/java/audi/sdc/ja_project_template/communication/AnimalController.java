package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.Animal;
import audi.sdc.ja_project_template.repository.NotPersistedException;
import audi.sdc.ja_project_template.service.AnimalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Set;
import java.net.URI;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public Set<Animal> get(@RequestParam(required = false) String name) {
        if (name == null || name.isEmpty()) {
            return animalService.getAll();
        }
        return this.animalService.getByName(name);
    }

    @GetMapping("/{id}")
    public Animal getById(@PathVariable int id) throws NotPersistedException {
        return this.animalService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Animal> create(@RequestBody AnimalRequestEntity animalRequestEntity) throws URISyntaxException {
        Animal animal = new Animal(animalRequestEntity.getId(), animalRequestEntity.getName(), animalRequestEntity.getNumberOfLegs());
        Animal response = this.animalService.create(animal);
        return ResponseEntity.created(new URI("localhost:8080/api/animals/" + response.id())).body(response);
    }

    @PutMapping()
    public ResponseEntity<Void> update(@RequestBody AnimalRequestEntity animalRequestEntity) {
        Animal animal = new Animal(animalRequestEntity.getId(), animalRequestEntity.getName(), animalRequestEntity.getNumberOfLegs());
        this.animalService.update(animal);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        this.animalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
