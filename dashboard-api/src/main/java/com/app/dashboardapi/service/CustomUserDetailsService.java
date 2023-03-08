package com.app.dashboardapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dashboardapi.model.Site;
import com.app.dashboardapi.model.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	com.app.dashboardapi.repository.UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return CustomUserDetails.build(user);
	}

	public void AddSiteToUserDetails(Site site) {
		Optional<User> user = userRepository.findById(site.getUserId());
		if (user.isPresent()) {
			List<Site> sites = user.get().getSites();
			sites.add(site);
			user.get().setSites(sites);

			userRepository.save(user.get());
		} else {
			throw new IllegalStateException("user existe pas ou pas bon site");
		}

	}

}
