package org.cjlee.auto.autojoosik.domain.repository;

import org.cjlee.auto.autojoosik.domain.entity.VirtualAssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VirtualAssetRepository extends JpaRepository<VirtualAssetEntity, Long> {

    List<VirtualAssetEntity> findAllByOrderByAssetId();
}
