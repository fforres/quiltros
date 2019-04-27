GIT_HASH ?=`git rev-parse --short=7 HEAD`

upload_maps: 
	curl -L -o sentry-cli https://github.com/getsentry/sentry-cli/releases/download/1.41.2/sentry-cli-Linux-x86_64
	chmod u+x sentry-cli
	echo ''
	echo ''
	echo ''
	echo ''

	echo "GIT_HASH ${}GIT_HASH"

	echo '[SENTRY] - Sentry Version'
	sentry-cli --version

	echo '[SENTRY] - Creating release ${GIT_HASH}'
	sentry-cli releases new $(GIT_HASH)
	
	echo '[SENTRY] - Setting release commits'
	# sentry-cli releases set-commits $(GIT_HASH) --commit "fforres/quiltros@$(GIT_HASH)"
	sentry-cli releases set-commits --auto $(GIT_HASH)
	
	echo '[SENTRY] - Link deploy to release'
	sentry-cli releases deploys $(GIT_HASH) new -e $(BRANCH)
	
	echo '[SENTRY] - Uploading source maps'
	sentry-cli releases files $(GIT_HASH) upload-sourcemaps .next --no-rewrite
	
	echo '[SENTRY] - Finalizing release'
	sentry-cli releases finalize $(GIT_HASH)

.PHONY: upload_maps