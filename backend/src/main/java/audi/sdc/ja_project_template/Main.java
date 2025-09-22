package audi.sdc.ja_project_template;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.model.Task;

public class Main {
    public static void main(String[] args) {
        Task task = new Task(
                1,
                "Projekt vorbereiten",
                "Projektplan erstellen und Ressourcen klären"
        );

        SubTask sub1 = new SubTask(101, "Projektplan schreiben", "Dokumentation in Confluence", true);
        SubTask sub2 = new SubTask(102, "Kickoff Meeting", "Termin mit Team einberufen", false);

        task.addSubtask(sub1);
        task.addSubtask(sub2);

        System.out.println(task);
    }
}
