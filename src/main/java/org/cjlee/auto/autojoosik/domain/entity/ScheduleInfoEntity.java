package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_schedule_info")
public class ScheduleInfoEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="schedule")
    private String schedule;

    @Column(name="task_type")
    private String taskType;

    @Column(name="enabled")
    private Boolean enabled;

    @Column(name="created_at")
    private LocalDateTime createdAt;
}
