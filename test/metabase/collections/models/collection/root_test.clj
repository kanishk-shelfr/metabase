(ns metabase.collections.models.collection.root-test
  (:require
   [clojure.test :refer :all]
   [metabase.api.common :as api]
   [metabase.collections.models.collection.root :as collection.root]
   [metabase.models.interface :as mi]
   [metabase.test :as mt]))

(deftest perms-test
  (doseq [[perms expected]    {nil                    false
                               #{"/"}                 true
                               #{"/db/1/"}            false
                               #{"/collection/root/"} true}
          ;; Audit content should not affect can-read?/can-write? on the root collection.
          premium-feature-set [#{} #{:audit-app}]
          f                   [#'mi/can-read? #'mi/can-write?]]
    (testing (format "%s with perms %s and features %s"
                     f (pr-str perms) (pr-str premium-feature-set))
      (mt/with-premium-features premium-feature-set
        (binding [api/*current-user-permissions-set* (atom perms)]
          (is (= expected
                 (f collection.root/root-collection))))))))
