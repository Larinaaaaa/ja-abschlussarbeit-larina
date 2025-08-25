package audi.sdc.ja_project_template.communication;

public class AnimalRequestEntity {
    private final int id;
    private final String name;
    private final int numberOfLegs;

    public AnimalRequestEntity(int id, String name, int numberOfLegs) {
        this.id = id;
        this.name = name;
        this.numberOfLegs = numberOfLegs;
    }

    public AnimalRequestEntity() {
        this(-1, null, 0);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getNumberOfLegs() {
        return numberOfLegs;
    }
}
