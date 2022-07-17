package com.fast.campus.simplesns.repository;

import com.fast.campus.simplesns.model.entity.PostEntity;
import com.fast.campus.simplesns.model.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostEntityRepository extends JpaRepository<PostEntity, Integer> {

    public Page<PostEntity> findAllByUser(UserEntity userEntity, Pageable pageable);

}
