package audi.sdc.ja_project_template;

import audi.sdc.ja_project_template.model.SubTask;
import audi.sdc.ja_project_template.model.Task;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Task task = new Task(
                1,
                "Projekt vorbereiten",
                LocalDate.of(2025, 9, 15),
                "Projektplan erstellen und Ressourcen klären",
                "Work",
                "High",
                "Medium"
        );

        SubTask sub1 = new SubTask(101, "Projektplan schreiben", "Dokumentation in Confluence", true);
        SubTask sub2 = new SubTask(102, "Kickoff Meeting", "Termin mit Team einberufen", false);

        task.addSubtask(sub1);
        task.addSubtask(sub2);

        System.out.println(task);
    }
}
