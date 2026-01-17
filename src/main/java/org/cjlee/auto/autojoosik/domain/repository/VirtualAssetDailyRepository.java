package org.cjlee.auto.autojoosik.domain.repository;

import org.cjlee.auto.autojoosik.domain.entity.VirtualAssetDailyEntity;
import org.cjlee.auto.autojoosik.domain.entity.VirtualAssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VirtualAssetDailyRepository extends JpaRepository<VirtualAssetDailyEntity, Long> {

    List<VirtualAssetDailyEntity> findAllByOrderById();
}
