package org.cjlee.auto.autojoosik.domain.repository;

import org.cjlee.auto.autojoosik.domain.entity.StockInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockInfoRepository extends JpaRepository<StockInfoEntity, Long> {

    List<StockInfoEntity> findAllByOrderByStkNmAsc();
}
