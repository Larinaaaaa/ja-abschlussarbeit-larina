package audi.sdc.ja_project_template.model.exception;

public class NotPersistedException extends Exception {
    public NotPersistedException(Object notPersistedEntity) {
        super("Cannot do action with not persisted entity " + notPersistedEntity.toString());
    }

    public NotPersistedException() {
        super("Cannot do action with not persisted entity");
    }
}
