package org.cjlee.auto.autojoosik.domain.repository;

import org.cjlee.auto.autojoosik.domain.entity.VirtualTradeLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VirtualTradeLogRepository extends JpaRepository<VirtualTradeLogEntity, Long> {

}
